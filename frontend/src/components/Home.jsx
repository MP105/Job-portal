import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Category from './Category'
import LatestJobs from './LatestJob'
import Footer from './Footer';
import useGetAllJobs from './hooks/useGetAllJobs';
import { store } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Home() {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(user && user.role === "recruiter"){
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
        <Navbar />
        <HeroSection />
       <Category />
       <LatestJobs />
        <Footer /> 
    </div>
  )
}

export default Home