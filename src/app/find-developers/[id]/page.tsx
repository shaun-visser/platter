'use client';
import { Button } from '@/app/components/ui/Button';
import { useAppContext } from '@/app/context';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronRight, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState, Fragment, Key } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useAppContext();
  const userData = useMemo(() => (data?.results ? data.results : []), [data]);
  const u = userData.find((user) => user.id.value === params.id);
  let [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => setIsOpen(true);

  return (
    <div className="bg-white py-10">
      <div className="container">
        <h1 className="font-bold mb-2 text-5xl">
          {u?.name.first} {u?.name.last}
        </h1>
        <div className="text-green flex test-xs flex-wrap gap-x-2">
          <p>
            {u?.skill}, {u?.role}
          </p>
          <p className="flex gap-2">
            <MapPin /> {u?.location.city}, {u?.location.country}
          </p>
        </div>
        <div className="grid py-8 grid-cols-12 gap-5 border-b border-gray-700">
          <div className="relative aspect-square w-full bg-slate border border-gray-600 col-span-3 flex items-center justify-center md:col-span-2">
            <Image
              src={u?.picture.large ?? ''}
              alt="profile"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
          <div
            className="col-span-9 md:col-span-
          10"
          >
            <p>{u?.copy}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 py-8 md:gap-5">
          <div className="md:col-span-9 md:border-r md:border-gray-700 pr-5">
            <h2 className="font-bold mb-2 text-3xl">Experience</h2>
            {u?.experience.map((exp: any) => (
              <>
                <h3
                  className="font-bold mt-4 mb-2 text-2xl"
                  key={exp.title.replaceAll(' ', '-').toLowerCase()}
                >
                  {exp.title}
                </h3>
                {exp?.workData?.map((wd: any, i: Key) => (
                  <p key={i}>
                    <p className="mb-2">* {wd}</p>
                  </p>
                ))}
              </>
            ))}
          </div>
          <div className="md:col-span-3">
            <a
              className="font-medium px-4 py-2.5 border border-gray flex items-center justify-center gap-2 rounded-md mb-10 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Mail />
              Connect
            </a>
            <p className="font-bold text-xl">
              {u?.name.first} can help you with:
            </p>
            <ul>
              {u?.helpWith.map((item: any, index) => (
                <li key={index} className="flex items-center my-2 text-s">
                  <ChevronRight color="#f16a35" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50 z-10"
              aria-hidden="true"
            />
          </Transition.Child>

          {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-30 overflow-y-auto">
              <Dialog.Panel className="w-[80%] bg-white py-7 rounded-lg shadow-2xl">
                <div className="px-7 border-b border-gray-700">
                  <p className="text-green text-2xl mb-3">Contact</p>
                  <Dialog.Title className="text-3xl font-bold mb-4">
                    {u?.name.first} {u?.name.last}
                  </Dialog.Title>
                </div>
                <form className="">
                  <div className="grid grid-cols-1 gap-5 px-7 md:grid-cols-12 pt-3.5 pb-9 border-b border-gray-700 mb-9">
                    <input
                      type="text"
                      className="md:col-span-6"
                      placeholder="Your first name"
                    />
                    <input
                      type="text"
                      className="md:col-span-6"
                      placeholder="Your last name"
                    />
                    <input
                      type="email"
                      className="md:col-span-12"
                      placeholder="Email address"
                    />
                    <textarea
                      placeholder="Would you like to leave a message"
                      className="md:col-span-6"
                      id=""
                      rows={10}
                    ></textarea>
                  </div>
                  <div className="px-7">
                    <div className="flex justify-end gap-3">
                      <Button variant="white" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="blue">Contact</Button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
