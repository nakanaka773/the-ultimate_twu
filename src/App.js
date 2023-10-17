
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from "recharts";
import Header from './components/Header'
import './output.css'
import SignIn from './components/SignIn';
import { auth} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from '@mui/material';


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight='bold'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Todo = () => {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    })
    return unsub;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { lefttitle,righttitle } = event.target.elements;

    const userDocumentRef = doc(collection(db, 'users'));
    await setDoc(userDocumentRef, {
      lefttitle: lefttitle.value,
      righttitle: righttitle.value,
      leftcount: 1,
      rightcount: 1
    })
  }

  const deleteUser = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    await deleteDoc(userDocumentRef)
  }

  const incrementleftCount = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    const userSnapshot = await getDoc(userDocumentRef);
    const userData = userSnapshot.data();
    const leftcount = userData.leftcount || 0; // Default to 0 if count doesn't exist

    // Update the count
    await updateDoc(userDocumentRef, {
      leftcount: leftcount + 1,
    });
  };

  const incrementrightCount = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    const userSnapshot = await getDoc(userDocumentRef);
    const userData = userSnapshot.data();
    const rightcount = userData.rightcount || 0; // Default to 0 if count doesn't exist

    // Update the count
    await updateDoc(userDocumentRef, {
      rightcount: rightcount + 1,
    });
  };





  return (
    <div className='pb-12 p-0 bg-gray-100'>
      <Header />
      {user && 
        <form onSubmit={handleSubmit} >
        <div className="flex justify-center items-center mt-12">
        <input type="text" name='lefttitle' className='w-64 h-12 rounded-md ' />
        <label className='mx-8'>VS</label>
        <input type="text" name='righttitle' className='w-64 h-12 rounded-md  ' />
        </div>
        <div className="flex justify-center items-center mt-8">
        <Button >お題を出す</Button>
        </div>
        
      </form>
      }
      

      {users.map((user) => (
        <div key={user.id} className='mt-12 mx-20 px-8  bg-white'>
          <div className='flex justify-center mt-8 pt-12 text-2xl font-extrabold'>
            <div className='flex justify-center items-center bg-leftcolor h-16 w-96 text-white mx-4'>
              <h1>{user.lefttitle}</h1>
            </div>
            <p className='flex justify-center items-center h-16'>VS</p>
            <div className='flex justify-center items-center bg-rightcolor h-16 w-96 text-white mx-4'>
              <h1>{user.righttitle}</h1>
            </div>
          </div>
          <div className='flex justify-center mt-4 items-center'>
            <button className='text-white bg-leftcolor text-2xl font-extrabold p-4 h-16 rounded-md' onClick={() => incrementleftCount(user.id)}>投票する</button>
            <PieChart width={400} height={400} >
              <Pie
                data={[{ value: user.leftcount, label: "1つ目" }, { value: user.rightcount, label: "2" }]}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                startAngle={-270}
                endAngle={90}
                
              >
                <Cell fill='#2CD9FF'></Cell>
                <Cell fill='#FF2727'></Cell>
              </Pie>
            </PieChart>
            <button onClick={() => incrementrightCount(user.id)} className='text-white bg-rightcolor text-2xl font-extrabold p-4 h-16 rounded-md'>投票する</button>
          </div>


        </div>


      ))}
    </div>
  )
}


export default Todo