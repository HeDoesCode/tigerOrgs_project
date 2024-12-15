function LoadingDots({ active = false }) {
    if (active)
        return (
            <div className="w-full h-full items-center flex justify-center">
                <div className="dot-flashing" />
            </div>
        );
}

export default LoadingDots;
