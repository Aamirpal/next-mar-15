export async function GET() {
  return await Response.json({ message: "succcess" });
}

export async function POST(request: Request, response: Response) {
  const loginData = await request.json();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include any other necessary headers here
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error!  status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.error("There was an errorfsdfdfdsfd:", error);
  }
}
