import React from 'react';

export const Send = () => {
  return (
    <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded'>
      <h2 className='text-3xl font-bold mb-4'>Send Form</h2>
      <form>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <label htmlFor='number' className='block text-sm font-bold mb-2'>
              Number:
            </label>
            <input
              type='number'
              id='number'
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
          <div>
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
          <div>
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
            <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
