import { usePlaylist } from "./PlaylistContext";
import { RiPlayLargeFill } from "react-icons/ri";
import { useTrack } from "./TrackContext";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
    const { artists, albums, playlists, newReleases } = usePlaylist();
    const { setplaycardclicked } = useTrack();
    const { token } = useAuth();
    const navigate = useNavigate();


    return (
        token && (
            <div className="p-6 flex flex-col gap-8">
                {artists.length > 0 && <div className="w-full">
                    <div className="flex justify-between items-baseline mb-2">
                        <h1 className="text-2xl font-bold text-white">Popular artists</h1>
                        {/* <a href="" className="text-sm">Show all</a> */}
                    </div>
                    <div className="flex justify-between w-full overflow-auto scrollbar-none">
                        {artists.map((artist) => (
                            <div key={artist.id} className="relative group">
                                <Link className='' to={`/${artist.type}/${artist.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-evenly w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={artist.images.length > 0 ? artist.images[1].url : "https://via.placeholder.com/150"}
                                            alt={artist.name}
                                            className=" w-[154px] h-[154px] rounded-full object-cover object-center"
                                        />
                                        <span className="text-[16px]">{artist.name}</span>
                                        <p className="text-sm">{typeof artist.type === 'string' ? artist.type.charAt(0).toUpperCase() + artist.type.slice(1) : artist.type}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${artist.type}/${artist.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>}
                {albums.length > 0 && <div className="w-full">
                    <div className="flex justify-between items-baseline mb-2">
                        <h1 className="text-2xl font-bold text-white">Popular albums and singles</h1>
                        {/* <a href="" className="text-sm">Show all</a> */}
                    </div>
                    <div className="flex justify-between w-full overflow-scroll scrollbar-none">
                        {albums.map((album) => (
                            <div key={album.id} className="relative group">
                                <Link className='' to={`/${album.type}/${album.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={album.images.length > 0 ? album.images[1].url : "https://via.placeholder.com/150"}
                                            alt={album.name}
                                            className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                        />

                                        <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{album.name}</span>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{album.artists.map((artist) => artist.name).join(", ")}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${album.type}/${album.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>}
                {playlists.length > 0 && <div className="w-full">
                    <div className="flex justify-between items-baseline mb-2">
                        <h1 className="text-2xl font-bold text-white">Popular radio</h1>
                        {/* <a href="" className="text-sm">Show all</a> */}
                    </div>
                    <div className="flex justify-between overflow-scroll scrollbar-none">
                        {playlists.map((playlist) => (
                            <div key={playlist.id} className="relative group ">
                                <Link className='' to={`/${playlist.type}/${playlist.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={playlist.images.length > 0 ? playlist.images[1].url : "https://via.placeholder.com/150"}
                                            alt={playlist.name}
                                            className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                        />
                                        <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.name}</span>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.artists.map((artist) => artist.name).join(", ")}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${playlist.type}/${playlist.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>}
                {newReleases.length > 0 && <div className="w-full">
                    <div className="flex justify-between items-baseline mb-2">
                        <h1 className="text-2xl font-bold text-white">New releases</h1>
                        {/* <a href="" className="text-sm">Show all</a> */}
                    </div>
                    <div className="flex justify-between w-full overflow-scroll scrollbar-none">
                        {newReleases.map((playlist) => (
                            <div key={playlist.id} className="relative group">
                                <Link className='' to={`/${playlist.type}/${playlist.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={playlist.images.length > 0 ? playlist.images[1].url : "https://via.placeholder.com/150"}
                                            alt={playlist.name}
                                            className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                        />
                                        <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.name}</span>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.artists.map((artist) => artist.name).join(", ")}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${playlist.type}/${playlist.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>}

            </div>)
    );
};

export default Playlists;