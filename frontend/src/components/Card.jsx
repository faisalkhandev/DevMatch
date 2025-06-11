
const Card = ({ data }) => {



    const badgeTypes = [
        "badge-primary",
        "badge-secondary",
        "badge-accent",
        "badge-info",
        "badge-success",
        "badge-warning",
    ];

    const getSkillBadgeClass = (index) => {
        return badgeTypes[index % badgeTypes.length];
    };

    return (
        <div className="card bg-base-300 w-96 shadow-xl border-4 border-amber-400">
            <figure>
                <img
                    src={data?.photoUrl || "https://via.placeholder.com/150"}
                    alt="Profile Picture"
                    className="w-full h-80 object-cover object-[15%_30%]"
                />

            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data?.firstName + " " + data?.lastName}
                    <div
                        className={`badge ${data?.gender.toLowerCase() === "male"
                            ? "badge-primary"
                            : "badge-secondary"
                            }`}
                    >
                        {data?.gender.toUpperCase()}
                    </div>
                </h2>
                <p>{data?.about}</p>

                <div className="card-actions justify-center my-4">
                    <button className="btn bg-red-600 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="size-[1.2em]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6l12 12M18 6l-12 12"
                            />
                        </svg>
                        Ignore
                    </button>
                    <button className="btn bg-green-600 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="size-[1.2em]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                        Interested
                    </button>
                </div>

                <div className="my-4">
                    {data?.skills && data?.skills.length > 0 ? (
                        data?.skills.map((skill, index) => (
                            <span
                                key={index}
                                className={`badge badge-outline ${getSkillBadgeClass(index)} m-1`}
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p>No skills available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
