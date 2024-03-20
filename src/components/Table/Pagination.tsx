import React from 'react';

const Pagination = () => {
    return (
        <div className="flex justify-end gap-2 m-5">
            <button className="join-item btn btn-outline">Previous page</button>
            <button className="join-item btn btn-outline">Next</button>
        </div>
    );
};

export default Pagination;