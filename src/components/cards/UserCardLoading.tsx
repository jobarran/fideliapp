import { UserCardImage } from '..';

export const UserCardLoading = () => {

    return (
        <div
            className="w-70 rounded-lg overflow-hidden  border border-slate-200 bg-white"
        >
            <div className="flex flex-col items-center justify-center h-2/3 bg-white">
                {/* Placeholder for company name */}
                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2 mt-2"></div>

                {/* Placeholder for image */}
                <div className="relative w-12 sm:w-16 h-12 sm:h-16 my-1 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <UserCardImage
                        src={undefined}
                        width={0}
                        height={0}
                        alt="company skeleton"
                        className="object-cover"
                        priority
                        style={{ width: '100%', height: '100%', backgroundColor: '#d0d0d0' }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between h-1/3 px-4 pb-2 mt-2">
                {/* Placeholder for points */}
                <div className="flex flex-col items-start">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>

                {/* Footer skeleton on the right side */}
                <div className="flex items-center justify-center w-1/3">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}
