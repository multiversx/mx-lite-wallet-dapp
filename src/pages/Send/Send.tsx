import React from 'react';

export const Send = () => {
  return (
    <div className='flex flex-col p-4 max-w-2xl w-full bg-white shadow-md rounded'>
      <h2 className='text-3xl font-bold mb-4'>Send Form</h2>
      <form>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4 justify-between'>
            <label htmlFor='amount' className='block text-sm font-bold mb-2'>
              Amount:
            </label>
            <input
              type='number'
              id='amount'
              className='block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-400'
              placeholder='Enter a number'
            />
            <select
              id='autocomplete'
              className='block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-400'
              placeholder='Select an option'
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </select>
          </div>
          <div className='flex row gap-4'>
            <label htmlFor='gasLimit' className='block text-sm font-bold mb-2'>
              Gas Limit:
            </label>
            <input
              type='number'
              id='gasLimit'
              className='block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-400'
              placeholder='Enter a gas limit'
            />
          </div>
          <div className='flex row gap-4'>
            <label htmlFor='data' className='block text-sm font-bold mb-2'>
              Data:
            </label>
            <textarea
              id='data'
              className='block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-400'
              placeholder='Enter your data'
            />
          </div>
          <div>
            <button className='w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
