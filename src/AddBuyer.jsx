import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
// pouchdb
import getMasterDB from './database/getMasterDB';

export default function AddBuyer() {
  const form = useForm({
    defaultValues: {
      companyName: '',
      ownerName: '',
      gstNo: '',
      number: '',
      email: '',
      address: '',
    }, mode: 'all'
  })

  const { register, formState, reset, handleSubmit, getValues } = form;
  const [masterDB, setMasterDB] = useState();
  const [reload, setReload] = useState();
  const { errors, isSubmitSuccessful } = formState;
  const navigate = useNavigate();

  useEffect(() => {

    const getBuyerList = async () => {
      // if masterDB does not exist 
      if (!masterDB) {
        let tempDb = await getMasterDB();
        console.log({ tempDb });
        setMasterDB(tempDb)
      }
      // if masterDB exists
      if (masterDB) {
        await masterDB.allDocs().then(async (doc) => {
          console.log({ doc })
          if (doc.total_rows == 0) {
            await masterDB.put({
              _id: 'invoice',
              dataArray: [],
            });
            await masterDB.put({
              _id: 'buyers',
              buyerList: [],
            });
          };
        });
        await masterDB.allDocs().then((allDocs) => {
          console.log({ allDocs })
        });
        await masterDB.get('buyers').then((doc) => {
          console.log(doc)
          let buyerList = doc.buyerList;
          console.log({ buyerList });
        });
      }
    };
    getBuyerList();
  }, [masterDB, reload])

  const onSubmit = async (values) => {
    const data = getValues()
    console.log({ data })
    await masterDB.get('buyers').then(async (doc) => {
      console.log({ doc })
      let newBuyerList = doc.buyerList;
      newBuyerList.push(values)
      doc.buyerList = newBuyerList;
      await masterDB.put(doc)
      navigate("/")
    })
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset, handleSubmit])

  return (
    <form id='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-control">
        <label htmlFor="companyName">Buyer Company Name:</label>
        <input type="text" id='companyName' {...register('companyName', {
          required: {
            value: true,
            message: 'This field is required',
          }
        })} />
        <p className='error'>{errors.companyName?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="ownerName">Owner name:</label>
        <input type="text" id='ownerName' {...register('ownerName', {
        })} />
      </div>

      <div className="form-control">
        <label htmlFor="gstNo">GST number:</label>
        <input type="text" id='gstNo' {...register('gstNo', {
        })} />
      </div>

      <div className="form-control">
        <label htmlFor="number">Phone number:</label>
        <input type="text" id='number' {...register('phNumber', {
        })} />
      </div>

      <div className="form-control">
        <label htmlFor="email">E-mail:</label>
        <input type="email" id='email' {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Invalid email format'
          },
        })} />
        <p className='error'>{errors.email?.message}</p>
      </div>

      <div className="form-control">
        <div style={{ display: 'flex' }}>
          <label htmlFor="address">Address:</label>
          <textarea style={{ marginLeft: '10px' }} name="address" id="address" cols="30" rows="2" {...register('address', {
          })}></textarea>
        </div>
      </div>

      <br />
      <Button type='submit' variant="contained" color="success">
        Add
      </Button>

    </form>
  )
}
