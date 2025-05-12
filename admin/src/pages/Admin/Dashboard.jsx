import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredAppointments = dashData?.lastestAppointments?.filter(item =>
    item.docData.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/admin/delete-appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (res.data.success) {
        getDashData(); // Refresh dashboard data
      } else {
        alert(res.data.message || 'Failed to delete appointment.');
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
      alert('Server error while deleting appointment.');
    }
  };

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className='m-5'>
        <div className='flex flex-wrap gap-3'>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.doctor_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
              <p className='text-gray-400'>Doctors</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.appointments_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
              <p className='text-gray-400'>Appointments</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.patients_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
              <p className='text-gray-400'>Patients</p>
            </div>
          </div>

        </div>

        {/* Latest Bookings Section */}
        <div className='w-full flex justify-center mt-10'>
  <div className='bg-white w-[90%] rounded shadow-md'>

    <div className='flex items-center justify-between px-4 py-4 rounded-t border-b'>
      <div className='flex items-center gap-2.5'>
        <img src={assets.list_icon} alt="" />
        <p className='font-semibold'>Latest Bookings</p>
      </div>

      <input
        type='text'
        placeholder='Search by doctor name...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='border px-3 py-1 rounded text-sm w-64 focus:outline-none focus:ring focus:border-blue-300'
      />
    </div>

    <div className='pt-4'>
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((item, index) => (
          <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-t' key={index}>
            <img className='rounded-full w-10' src={item.docData.image} alt="" />

            <div className='flex-1 text-sm'>
              <p className='text-gray-800 font-medium'>{item.docData.name}</p>
              <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
            </div>

            {item.cancelled ? (
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt="Cancel"
                title="Cancel Appointment"
              />
            )}
          </div>
        ))
      ) : (
        <p className='text-sm text-gray-500 px-6 py-4'>No appointments found.</p>
      )}
    </div>

  </div>
</div>

      </div>
    )
  );
};

export default Dashboard;
