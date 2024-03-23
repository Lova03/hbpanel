import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { editItems } from '../../features/items/itemsSlice';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import StorageItem from '../StorageItem/StorageItem';

const StoreItem = ({ data }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ original: { ...data }, updated: { ...data } });
  const [selected, setSelected] = useState([]);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitChanges = () => {
    setLoading(true);
    item.updated.storage = item.updated.storage.filter((x) => !selected.includes(x));
    setSelected([]);
    axios
      .put('http://localhost:5000/api/items', { item: item.updated }, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        if (res?.data?.success) {
          toast.success('Úspěšně jsem upravil předmět');
          dispatch(editItems(item.updated));
          setItem((prev) => ({ ...prev, original: prev.updated }));
        }
        if (!res?.data?.success) toast.error('Někde nastala chyba');
      })
      .catch((err) => {
        setLoading(false);
        const data = err.response?.data;
        if (data?.msg) return toast.error(err.response.data.msg);
        if (typeof data === 'string' && data?.includes('logged in'))
          return toast.error('Nejprve se musíš přihlásit');
        if (typeof data === 'string' && data?.includes('enough permissions'))
          return toast.error('Nemáš dostatečné oprávnění');
        return toast.error(err.message || 'Někde nastala chyba');
      });
  };

  const handleReset = () => {
    setItem((prev) => ({ ...prev, updated: prev.original }));
    setSelected([]);
  };
  const toggleEnabled = () => {
    setItem((prev) => ({ ...prev, updated: { ...prev.updated, enabled: !prev.updated.enabled } }));
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setItem((prev) => ({ ...prev, updated: { ...prev.updated, stock: Number(value) } }));
  };
  const handleSelect = (text) => {
    if (selected.includes(text)) return setSelected((prev) => prev.filter((x) => x !== text));
    setSelected((prev) => [...prev, text]);
  };

  useEffect(() => {
    const isEdited =
      item.original.stock !== item.updated.stock ||
      selected.length > 0 ||
      item.original.enabled !== item.updated.enabled;

    setEdited(isEdited);
  }, [item, selected]);

  return (
    <div className='w-11/12 max-w-4xl px-4 py-2 rounded-lg bg-zinc-900/50 flex flex-col'>
      {/* Name */}
      <div className='flex justify-between items-center h-9'>
        <span className='uppercase'>{data.name}</span>
        {edited && (
          <div className='relative flex justify-center items-center'>
            <ExclamationCircleIcon className='h-9 text-amber-500' />
            <ExclamationCircleIcon className='absolute h-9 text-amber-500 animate-ping' />
          </div>
        )}
      </div>
      {/* Content */}
      <div className='flex flex-col mt-2 px-2 space-y-5'>
        {/* Enabled */}
        <div className='flex flex-col space-y-2'>
          <span className='uppercase text-sm'>Enabled</span>
          <div
            onClick={toggleEnabled}
            style={{
              backgroundColor: item.updated.enabled ? '#38bdf8' : `rgba(63 63 70 / 0.7)`,
            }}
            className='rounded-full w-14 h-8 ml-8 relative flex items-center justify-center transition-all duration-300 cursor-pointer'>
            {/* Lever */}
            <div
              style={{
                transform: `translateX(${(item.updated.enabled ? 1 : -1) * 12}px)`,
                backgroundColor: item.updated.enabled ? 'white' : '#38bdf8',
              }}
              className='absolute w-6 h-6 rounded-full transition-all duration-300'></div>
          </div>
        </div>
        {/* Stock */}
        {data.name !== 'jamcraft' && (
          <div className='flex flex-col space-y-2'>
            <span className='uppercase text-sm'>Stock</span>
            <div className='ml-8 flex space-x-2'>
              <input
                className='px-2 py-1 bg-zinc-700/70 outline-none rounded-md w-32 h-8'
                value={item.updated.stock}
                onChange={handleChange}
                type='number'
                name='stock'
              />
            </div>
          </div>
        )}
        {/* Storage */}
        {data.name !== 'skins' && (
          <div className='flex flex-col space-y-2 '>
            <span className='uppercase text-sm'>Storage</span>
            <div className='flex flex-col relative w-full max-w-2xl'>
              {item.updated.storage?.length === 0 && <span className='ml-8 text-sm'>Prázdné</span>}
              {item.updated.storage.map((si, idx) => {
                return (
                  <StorageItem
                    handleSelect={handleSelect}
                    selected={selected.includes(si)}
                    key={idx}
                    title={si}
                  />
                );
              })}
            </div>
          </div>
        )}
        {/* Save Changes */}
        {edited && !loading && (
          <div className='flex space-x-3 relative ml-auto'>
            <button
              onClick={handleReset}
              className='px-5 py-1 rounded-md bg-gradient-to-br transition-all duration-200 from-amber-300 to-amber-600 hover:from-amber-200 hover:to-amber-500'>
              <span>Obnovit</span>
            </button>

            <button
              onClick={submitChanges}
              className='px-5 py-1 rounded-md bg-gradient-to-br transition-all duration-200 from-lime-400 to-emerald-600 hover:from-lime-300 hover:to-emerald-500'>
              <span>Uložit</span>
            </button>
          </div>
        )}
        {/* Loading */}
        {loading && (
          <div className='flex items-center justify-center py-2'>
            <Loading size={32} width={3} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreItem;
