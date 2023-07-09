import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser, getSingleUser } from '../../features/getUserSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../anim/Loading';

const Users = () => {

    const dispatch = useDispatch()
    const [user, setUser] = useState()

    const { users, loading } = useSelector(state => state.app);


    useEffect(() => {
        dispatch(getAllUser()); // Dispatch the action to fetch users
    }, [dispatch]);

    console.log(users);

    const handleView = (id) => {
        dispatch(getSingleUser(id)).then((response) => {
            setUser(response.payload);
        });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteUser(id))
                    .unwrap()
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.log('Failed to delete user:', error);
                    });

            }
        })

    };

    if (loading) {

        return <Loading></Loading>
    }

    console.log(user);


    return (
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto table table-xs">



            <table className="w-full   text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">id</th>
                        <th className="py-3 px-6">Name</th>

                        <th className="py-3 px-6"></th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {
                        users && users.map((item) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                                <td className="text-right px-6 whitespace-nowrap">
                                    <label htmlFor="my_modal_6" onClick={() => handleView(item?._id)} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">View</label>

                                    <Link to={`/updateUser/${item?._id}`} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDeleteUser(item?._id)}
                                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Delete
                                    </button>


                                </td>
                            </tr>
                        ))
                    }
                </tbody>

                {/* The button to open modal */}

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h1>User</h1>
                        <h3 className="font-bold text-lg">{user?.name}</h3>
                        <p className="py-4">{user?.email}</p>
                        <p className="py-4">{user?.phone}</p>
                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </table>
        </div>
    );
};

export default Users;