import axios, * as others from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../Auth/AuthContext';
import toast, { Toaster } from 'react-hot-toast';



const LiveElection = () => {
  const [cdata,setCData]=useState([])
  const [loading,setLoading]=useState(false)
  const {token,userInfo}=useContext(AuthContext)
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    party: '',
  });


  useEffect(()=>{
    setLoading(true)
     axios.get(`${import.meta.env.VITE_BASE_URL}candidate`)
    .then(function (response) {
      // handle success
      setCData(response.data)
      // console.log(response.data)

    setLoading(false)

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    setLoading(false)

    })
  },[])

    

  const handleVote = async(id)=>{
    
    await axios   
    .get(`${import.meta.env.VITE_BASE_URL}candidate/vote/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
  )
    .then(function (response) {
      console.log(response);
      toast.success('Successfully Voted')
      
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error.response.data.error)

    });

  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    await axios
      .put(`${import.meta.env.VITE_BASE_URL}candidate/${selectedMember._id}`, formData,
        {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(function (response) {
        // console.log(response);
      setLoading(false)

     toast.success('Changes Saved Successfully')
     setSelectedMember(null);
     window.location.reload();

        
      })
      .catch(function (error) {
        console.log(error);
      setLoading(false)
      setSelectedMember(null);
      toast.error(error.response.data.error)

      });

  };


  const handleChangeClick = (member) => {
    setSelectedMember(member); // Set the selected member
    setFormData({
      name: member.name,
      age: member.age,
      party: member.party,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCancel = () => {
    // Hide the form without making any changes
    setSelectedMember(null);
  };

  
  return (
    <div className="my-4 ">

{loading && (
  <div className="text-center my-4">
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)}





      <ul className={`max-w-4xl divide-y mx-auto divide-gray-200 shadow p-5 rounded-md ${selectedMember ? 'blurred' : ''}`} >
      {cdata.map((data,ind)=>(
       
       <li key={ind} className="pb-3 sm:pb-4">
       
       <div  className="flex items-center space-x-4 rtl:space-x-reverse">
       <div className="flex-shrink-0">
         <img
           className="w-8 h-8 rounded-full"
           src="https://xsgames.co/randomusers/avatar.php?g=male"
           alt="Neil image"
         />
       </div>
       <div className="flex-1 min-w-0">
         <p className="text-sm font-medium text-gray-900 truncate ">
           {data.name}
         </p>
         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
         {data.party}
         </p>
       </div>

       {token?<>{userInfo.role === 'admin'?<div className="inline-flex items-center text-base font-semibold text-gray-900 ">
         <button
           type="button"
           className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal bg-[#358053] text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
           data-twe-ripple-init
           data-twe-ripple-color="light"
           onClick={() => handleChangeClick(data)}
         >
           Change
         </button>
       </div>:<></>}</>:<></>}

       {token?<div className="inline-flex items-center text-base font-semibold text-gray-900 ">
         <button
           type="button"
           className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal bg-[#00263a] text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
           data-twe-ripple-init
           data-twe-ripple-color="light"
           onClick={()=>handleVote(data._id)}
         >
           Vote
         </button>
       </div>:<></>}
       
     </div>
             
             
             </li>
      ))}
        
      </ul>
      <Toaster />

      {selectedMember && (
        <div className="container mx-auto flex absolute top-9">
        <div className="max-w-lg w-full mx-auto mt-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="px-8 py-2">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-1">
                  <div className="mb-2">
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <input
                  
                      type="text"
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      Age
                    </label>
                    <input
                    
                      type="number"
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      />

                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      Party Name
                    </label>
                    <input
                      type="text"
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                      id="party"
                      name="party"
                      value={formData.party}
                      onChange={handleInputChange}
                      required
                    />

                  </div>


                </div>
                {loading === true ?
              <button disabled type="button"  className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
              </button>
              :
              <>
              <button
                  type="submit"
                  className="w-full p-3 mt-4 bg-green-900 text-white rounded shadow"
                >
                  Save Changes
                </button>
              <button
              type='button'
              onClick={handleCancel}
                  className="w-full p-3 mt-4 bg-red-900 text-white rounded shadow"
                >
                  Cancel
                </button>
                </>
             }  
               
              </form>
            </div>
            
          </div>
        </div>
       </div>)}

     </div>
  );
};

export default LiveElection;
