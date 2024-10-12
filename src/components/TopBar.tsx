import UserAvatar from "./UserAvatar"


const TopBar = ({ title }: { title: string }) => {
    return <div className="flex justify-between flex-wrap  items-center border-b pb-1 px-5">
        <h3 className="text-center font-semibold text-2xl">{title}</h3>
        <div className="flex items-center gap-5">
            <UserAvatar />
        </div>
    </div>
}

export default TopBar