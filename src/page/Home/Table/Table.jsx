import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPlus, FaUser } from "react-icons/fa";
import Loading from "../../../anim/Loading";


const Table = () => {


    const {users, loading} = useSelector(state => state.app)


    if (loading) {


        return <Loading></Loading>
     }

    
    return (
        <section className="py-28">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">Users</h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">Give your team members access to manage the system.</p>
            </div>
            <Link to = "/createUser" href="javascript:void(0)" className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                <FaPlus></FaPlus>
                Add User
            </Link>
        </div>
            <ul className="mt-12 divide-y space-y-3">
                {
                    users.map((item) => (
                        <li key={item._id} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50 flex justify-between">
                                <div className="flex items-center gap-x-3">
                                    <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center">
                                        <FaUser></FaUser>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-indigo-600 font-medium">{item.name}</span>
                                        <h3 className="text-base text-gray-800 font-semibold mt-1 flex items-center"> <FaEnvelope className="mr-2"></FaEnvelope> {item.email}</h3>
                                    </div>
                                </div>
                                
                                    <button className="  badge badge-lg text-sm rounded-lg text-blue-600 bg-blue-50">
                                        User
                                        
                                    </button>
                                    
                        </li>
                    ))
                }
            </ul>
        </div>
    </section>
    );
};

export default Table;