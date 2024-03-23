import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems,
  selectHasItemsError,
  selectIsItemsLoading,
  selectItems,
} from '../../features/items/itemsSlice';
import Loading from '../../components/Loading/Loading';
import ShopItem from '../../components/ShopItem/ShopItem';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const PanelPage = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);

  const isLoading = useSelector(selectIsItemsLoading);
  const hasError = useSelector(selectHasItemsError);

  const refreshItems = () => {
    dispatch(fetchItems());
  };

  if (isLoading) {
    return (
      <div className='relative flex flex-col h-main justify-center items-center'>
        <Loading size={64} width={4} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className='relative flex flex-col h-main justify-center items-center'>
        <div className='flex flex-col space-y-4 items-center justify-center'>
          <span className='text-rose-800'>Chyba při načítání předmětů</span>
          <button
            onClick={refreshItems}
            className='cursor-pointer px-8 py-1 rounded-md border-solid border border-sky-700 group'>
            <ArrowPathIcon className='h-8 group-hover:animate-spin-5' />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex flex-col items-center space-y-5 h-main px-4 py-8 overflow-auto overflow-x-hidden'>
      {items.success && items?.data?.map((shopitem, idx) => <ShopItem data={shopitem} key={idx} />)}
    </div>
  );
};

export default PanelPage;
