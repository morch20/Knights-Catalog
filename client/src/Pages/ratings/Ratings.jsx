import React, { useState, useEffect } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';


const Ratings = () => {

    const [stepOne, setStepOne] = useState(0);
    const [animateStepOne, setAnimateStepOne] = useState('right-to-middle');

    const [stepTwo, setStepTwo] = useState('');
    const [animateStepTwo, setAnimateStepTwo] = useState('right-to-middle');

    const [stepThree, setStepThree] = useState('');
    const [animateStepThree, setAnimateStepThree] = useState('right-to-middle');


    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleSteps = async (value, setStepFunction) => {
        await timeout(750);
        setStepFunction(value);
    }

    const backToOne = async () => {
        setAnimateStepTwo('middle-to-right');
        await timeout(750);
        setAnimateStepOne('left-to-middle');
        setStepOne(0);
        setAnimateStepTwo('right-to-middle');
    }

    const backToTwo = async () => {
        setAnimateStepThree('middle-to-right');
        await timeout(750);
        setAnimateStepTwo('left-to-middle');
        setStepTwo('');
        setAnimateStepThree('right-to-middle');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='h-full min-h-[80dvh] '>
            <main className='h-full pb-14'>
                <header >

                    <div className='my-10 2xl:my-20 relative'>
                        <h1 className=' text-center text-2xl xsm:text-3xl 2xl:text-4xl font-semibold mb-3'>
                            Start rating all your favorite programs and courses!
                        </h1>
                        <div className='bg-[color:var(--yellow)] w-[65%] h-1 absolute left-1/2 translate-x-[-50%]'></div>
                    </div>


                </header>

                <section>

                    <p className='text-gray-400 my-5'>
                        {stepOne === 1 ? 'Program / ' : stepOne === 2 ? 'Course / ' : ''}
                        {stepTwo && `${stepTwo} / `}
                    </p>

                    {
                        (stepOne === 0)
                            ?
                            <StepOne
                                handlerFunction={(value) => {
                                    setAnimateStepOne('middle-to-left');
                                    handleSteps(value, setStepOne);
                                }}
                                animate={animateStepOne}
                            />
                            :
                            <>
                                {
                                    !stepTwo
                                        ?
                                        <StepTwo
                                            handlerFunction={(value) => {
                                                setAnimateStepTwo('middle-to-left');
                                                handleSteps(value, setStepTwo);
                                            }}
                                            animate={animateStepTwo}
                                            backwardsFunction={backToOne}
                                            type={stepOne}
                                        />
                                        :
                                        <StepThree 
                                            animate={animateStepThree} 
                                            backwardsFunction={backToTwo} 
                                            type={stepOne}
                                            typeInfo={stepTwo}
                                        />
                                }


                            </>
                    }
                </section>


            </main>
        </div>
    );
}

export default Ratings;