import NavAdmin from '@/Components/NavAdmin'
import React from 'react'
import Footer from '@/Components/Footer'

export default function AdminHome({bannerImage}) {
  return (
    <div>
      <NavAdmin/>
      
      {/* carouDetailsnav */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center pt-[4%]">
        {/* div1details */}
        <div className="ml-[15%]">
          <h2 className="font-medium text-[40px]">Admin Dashboard</h2>
          <p>Aranoz - Shop System</p>
        </div>
        
        {/* div2details */}
        <div>
          <img src={bannerImage} alt="" />
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}