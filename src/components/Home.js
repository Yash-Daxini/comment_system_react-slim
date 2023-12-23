import React from 'react'
import '../css/style.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='my-5 d-flex justify-content-center align-items-center flex-column'>
      <h1>Comment System</h1>
      <div className="my-5">
          <Link
            to={"/Blogs"}
            className="text-decoration-none text-white fs-3 homeHeadingAnimation"
          >
            Explore the world of blog
          </Link>
          <Link
            to={"/blogs"}
            className="text-decoration-none homePageHeadingArrow fs-3 mt-2 mx-2"
          >
            <ion-icon
              className="anim-delay-6000ms"
              name="chevron-forward-outline"
            ></ion-icon>
          </Link>
        </div>
    </div>
  )
}

export default Home;
