import MoonLoader from "react-spinners/MoonLoader";

export default function Loader() {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <div className="h-full flex justify-center items-center">
                <MoonLoader 
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}
