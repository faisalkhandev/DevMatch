
import "./Card.css";

const Card = ({ data, loading }) => {
    const { firstName, lastName, gender, about, photoUrl, skills } = data;


    if (loading) {
        return (
            <div className="card bg-base-500 w-96 shadow-sm shimmer">
                <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-paragraph"></div>
                    <div className="skeleton-paragraph"></div>
                    <div className="skeleton-btn"></div>
                    <div className="skeleton-btn"></div>
                </div>
            </div>
        );
    }

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
        <div className="card bg-base-500 w-96 shadow-sm">
            <figure>
                <img src={photoUrl || []} alt="Profile Picture" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                    <div
                        className={`badge ${gender.toLowerCase() === "male"
                            ? "badge-primary"
                            : "badge-secondary"
                            }`}
                    >
                        {gender.toUpperCase()}
                    </div>
                </h2>
                <p>{about}</p>

                <div className="card-actions justify-center my-4">
                    <button className="btn bg-red-600">
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
                    <button className="btn bg-green-600">
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
                    {skills && skills.length > 0 ? (
                        skills.map((skill, index) => (
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
