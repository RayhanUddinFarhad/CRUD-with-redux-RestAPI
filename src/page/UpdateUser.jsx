import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/getUserSlice';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.app.users.find((user) => user._id === id));


    const onSubmit = (data) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to update it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
                navigate('/users');
                dispatch(updateUser({ _id: id, ...data }));

               


              Swal.fire(
                'Updated!',
                'Your file has been Updated.',
                'success'
              )

            
            }
          })



       
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto space-y-3 sm:text-center">
                    <h3 className="text-indigo-600 font-semibold">
                        Update User
                    </h3>

                    <p>
                        Hey {user.name} Please fill out the form bellow.
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto">
                    <form
                        onSubmit={handleSubmit(onSubmit)} className="space-y-5"
                    >
                        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                            <div>
                                <label className="font-medium ">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    {...register("name")}
                                    defaultValue={user.name}

                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />

                            </div>

                        </div>
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                {...register("email")}
                                placeholder="email"
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />

                        </div>
                        <div>
                            <label className="font-medium">
                                Phone number
                            </label>
                            <div className="relative mt-2">
                                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                                    <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                                        <option>US</option>
                                        <option>ES</option>
                                        <option>MR</option>
                                    </select>
                                </div>
                                <input
                                    type="number"
                                    defaultValue={user.phone}
                                    placeholder="+1 (555) 000-000"
                                    {...register("phone")}
                                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />

                            </div>
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default UpdateUser;