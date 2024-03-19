"use client";
import {useState, FormEvent} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {z} from 'zod';

const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
});


const LoginPage: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setErrors(null);
        const formData = {
            email: email,
            password: password,
        };

        try {
            formSchema.parse(formData);
            setLoading(true);
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error("Login failed");
            }

            // console.log('Form data:', formData);
            // console.log("Login successful, token:", data.access_token);
            router.push("/dashboard");
        } catch (error) {
            setLoading(false); // Ensure loading is false in case of an error
            if (error instanceof z.ZodError) {
                const newErrors = {};
                error.errors.forEach(({path, message}) => {
                    newErrors[path[0]] = message;
                });
                setErrors(newErrors);
            } else {
                // @ts-ignore
                setErrors({"login_api": "Invalid credentials. Please try again."});
                console.log("Unexpected error:", error);
            }
        }
    };

    return (
        <div className="hero min-h-screen bg-gray-300">
            <div className="hero-content flex-col w-full">
                <div className=" lg:text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    {/*<p className="py-6">*/}
                    {/*    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda*/}
                    {/*    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et*/}
                    {/*    a id nisi.*/}
                    {/*</p>*/}
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        {errors?.login_api && (
                            <div role="alert" className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{errors.login_api}</span>
                            </div>
                        )}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className={`input input-bordered ${errors?.email ? "input-error" : ""}`}
                                required
                                onChange={(ele) => setEmail(ele.target.value)}
                            />
                            {errors?.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.email}</span>
                                </label>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className={`input input-bordered ${errors?.password ? "input-error" : ""}`}
                                required
                                onChange={(ele) => setPassword(ele.target.value)}
                            />
                            {errors?.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password}</span>
                                </label>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            {isLoading ? (
                                <button className="btn">
                                    <span className="loading loading-spinner"></span>
                                    loading
                                </button>
                            ) : (
                                <button onClick={handleLogin} className="btn btn-primary">
                                    <Link href="/dashboard">Login</Link>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
