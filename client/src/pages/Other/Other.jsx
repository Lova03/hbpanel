import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { fetchItems } from '../../features/items/itemsSlice';
import PanelPage from '../PanelPage/PanelPage';

const Other = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
    setLoaded(true);
  }, [dispatch]);

  return (
    <div className={`opacity-0 transition-opacity duration-300${loaded && ' opacity-100'}`}>
      <Navbar opened={opened} setOpened={setOpened} />
      <Header opened={opened} />
      <div>
        <main
          className={`h-main relative transition-all duration-100 ${
            opened ? 'ml-8 sm:ml-12 lg:ml-64' : 'ml-8 sm:ml-12'
          }`}>
          <Routes>
            <Route path='/' element={<PanelPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme='colored'
        />
      </div>
    </div>
  );
};

export default Other;
