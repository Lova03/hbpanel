import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { fetchUser, selectIsUserLoading, selectUser } from './features/user/userSlice';
import HomePage from './pages/HomePage/HomePage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import NotFound from './pages/NotFound/NotFound';
import Other from './pages/Other/Other';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsUserLoading);
  const finished = Object.keys(user).length > 0;
  return (
    <Router>
      <div className='w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-800 to-slate-900 font-rubik text-slate-200'>
        {isLoading && <LoadingPage />}
        {!isLoading && finished && (
          <Routes>
            <Route index element={<HomePage />} />
            <Route element={<ProtectedRoute isAllowed={user.isAdmin} />}>
              <Route path='panel/*' element={<Other />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
