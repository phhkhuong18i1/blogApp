import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs"
const Footers = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-red-400 rounded-lg text-white">
                Khuong
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
               <div>
               <Footer.Title title="about" />
                <Footer.LinkGroup col>
                    <Footer.Link href="#">
                       Github
                    </Footer.Link>
                    <Footer.Link href="#">
                       Facebook
                    </Footer.Link>
                </Footer.LinkGroup>
               </div>
               <div>
               <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                    <Footer.Link href="#">
                       Instagram
                    </Footer.Link>
                    <Footer.Link href="#">
                       Facebook
                    </Footer.Link>
                </Footer.LinkGroup>
               </div>
               <div>
               <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                    <Footer.Link href="#">
                       Instagram
                    </Footer.Link>
                    <Footer.Link href="#">
                       Facebook
                    </Footer.Link>
                </Footer.LinkGroup>
               </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Khuong blog " year={new Date().getFullYear()} />
        <div className="flex gap-6 sm:mt-0 mt-5 sm:justify-center ">
            <Footer.Icon href="#" icon={BsFacebook}/>
            <Footer.Icon href="#" icon={BsInstagram}/>
            <Footer.Icon href="#" icon={BsTwitter}/>
            <Footer.Icon href="#" icon={BsGithub}/>
        </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
