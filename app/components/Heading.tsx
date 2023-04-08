'use client'

interface HeadingProps {
    title: string;
    subTitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
    return (
        <div className={center ? 'text-center' : 'text-star'}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-400">
                {subTitle}
            </div>
        </div>
    )
}

export default Heading;;