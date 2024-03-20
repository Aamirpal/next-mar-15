import React, {Component} from 'react';

class Drawer extends Component {
    render() {
        return (
            <div className="drawer drawer-end" style={{position: 'fixed', top: 0, zIndex: 1000, width: '100%'}}>
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex flex-col justify-between h-full bg-base-200">
                        <ul className="menu p-4 w-80 text-base-content">
                            {/* Sidebar content here */}
                            <li>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select className="select select-bordered">
                                        <option disabled="" selected="">
                                            Pick
                                        </option>
                                        <option>T-shirts</option>
                                        <option>Dresses</option>
                                        <option>Hats</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select className="select select-bordered">
                                        <option disabled="" selected="">
                                            Pick
                                        </option>
                                        <option>T-shirts</option>
                                        <option>Dresses</option>
                                        <option>Hats</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <label>
                                    <span className="label-text">Active user</span>
                                    <input type="checkbox" value="synthwave" className="toggle theme-controller"/>
                                </label>
                            </li>
                        </ul>
                        <div className="p-4 w-80 bg-base-200">
                            <button className="btn btn-active btn-primary w-full">Apply</button>
                            <button className="btn btn-link w-full">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Drawer;