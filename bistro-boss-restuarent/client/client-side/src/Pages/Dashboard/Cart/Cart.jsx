import React from 'react';
import useCart from '../../../Hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import SectionTitles from '../../../Components/SectionTitles';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className=''>
            <SectionTitles heading="My Cart" subHeading="Wanna Add More?"></SectionTitles>
            <div className='flex justify-between  mb-12'>
                <h2 className='text-4xl'>Total Orders: {cart.length}</h2>
                <h2 className='text-4xl'>Total Price: {totalPrice}</h2>
                {
                    cart.length ?
                        <Link to="/dashboard/payment">
                            <button className='btn btn-primary'>Pay</button>
                        </Link>
                        :
                        <button disabled className='btn btn-primary'>Pay</button>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full bg-gray-100">
                    {/* head */}
                    <thead className='bg-orange-400 text-black'>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrash className='text-orange-500'></FaTrash>
                                        </button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;