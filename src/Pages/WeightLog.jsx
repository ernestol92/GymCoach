import BackButton from '../Components/BackButton';
import { useState, useEffect, useMemo } from 'react';
import { db } from '../db/db';
import { useNavigate } from 'react-router-dom';
import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

const WeightLog = () => {

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const [weight, setWeight] = useState(0);
    const [weightData, setWeightData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('all');
    const navigate = useNavigate();



    const handleDecreaseWeight = () => {
        setWeight(prev => roundWeight(Math.max(0, prev - 0.1)));
    }

    const handleIncreaseWeight = () => {
        setWeight(prev => roundWeight(prev + 0.1));
    }

    const roundWeight = value => {
    return Math.round(value * 10) / 10
    }

    const saveWeight = async () => {
        if (weight <= 0) return;
        const existingEntry = await db.weightHistory.where("date").equals(currentDate).first();
        if (existingEntry) {
            await db.weightHistory.update(existingEntry.id, { weight: weight });
        } else {
            const weightEntry = {
                date: currentDate,
                weight: weight
            };

            // const weightEntries = [
            // {
            //     date: "2026-02-15",
            //     weight: 85.4
            // },
            // {
            //     date: "2026-03-16",
            //     weight: 83.2
            // },
            // {
            //     date: "2026-04-17",
            //     weight: 81.1
            // },
            // {
            //     date: "2026-05-18",
            //     weight: 80.9
            // },
            // {
            //     date: "2026-06-19",
            //     weight: 78.8
            // },
            // {
            //     date: "2026-07-20",
            //     weight: 76.7
            // },
            // {
            //     date: "2026-07-22",
            //     weight: 78.9
            // },
            // {
            //     date: "2026-07-24",
            //     weight: 76.2
            // },
            // {
            //     date: "2026-07-27",
            //     weight: 75.1
            // }
            // ];
            // await db.weightHistory.clear();
            // await db.weightHistory.bulkAdd(weightEntries);
            await db.weightHistory.add(weightEntry);
            
        }
        navigate('/');
    }

    const filteredWeightData = useMemo(()=>{
        const sortedData = [...weightData].sort(
            (a,b) => new Date(a.date) - new Date(b.date)
        )

        if(selectedRange === 'all') return sortedData
        
        const days = Number(selectedRange)
        const startDate = new Date();

        startDate.setHours(0,0,0,0);
        startDate.setDate(startDate.getDate() - days);

        return sortedData.filter(entry => {return new Date(entry.date) >= startDate})
    },[selectedRange, weightData])
    
    useEffect( () => {
       async function data() {
        
        const data = await db.weightHistory.orderBy("date").toArray();
        setWeightData(data);
        console.log(data)
       }

        data();
    }, []);

  return (
    <>

        
    
        <div className='start-page-column transparent relative'>
            <div className='transparent'>
                <BackButton/>
                <h2 className='breadCrumb transparent'>
                    Weight Log
                </h2>
            </div>
            <div className='transparent weightTrackBtns'>
                <input 
                    type="radio" 
                    name="weightTrack" 
                    id="trackWeightAll"
                    value="all"
                    checked={selectedRange === 'all'}
                    onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className='transparent' htmlFor="trackWeightAll">ALL</label>

                <input 
                    type="radio" 
                    name="weightTrack" 
                    id="trackWeight90"
                    value="90"
                    checked={selectedRange === '90'}
                    onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className='transparent' htmlFor="trackWeight90">90D</label>

                <input 
                    type="radio" 
                    name="weightTrack" 
                    id="trackWeight30"
                    value="30"
                    checked={selectedRange === '30'}
                    onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className='transparent' htmlFor="trackWeight30">30D</label>

                <input 
                    type="radio" 
                    name="weightTrack" 
                    id="trackWeight14"
                    value="14"
                    checked={selectedRange === '14'}
                    onChange={(e) => setSelectedRange(e.target.value)}
                />
                <label className='transparent' htmlFor="trackWeight14">14D</label>
            </div>
            <LineChart className="weight-chart" data={filteredWeightData} style={{padding: '10px', width: '100%', aspectRatio: 1, maxWidth: 600, background: 'transparent' }}>
                <Tooltip />
                {/* <CartesianGrid className="transparent" strokeDasharray="2 5" style={{ background: 'transparent' }} /> */}
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Line dataKey="weight" stroke="#c1ff00" strokeWidth={3} dot={{ stroke: '#c1ff00', strokeWidth: 2, r: 4 }} />
            </LineChart>


            <div className='reportSet glass-dark'>
                <div className='set mb '>
                    <h3>{currentDate}</h3>
                </div>

                <p>Weight:</p>
                
                <div className='btnWrapper mb'>
                    <button className='subAddBtn' onClick={handleDecreaseWeight}>-</button>
                    <input
                        className='numberInput'
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                    />
                    <button className='subAddBtn' onClick={handleIncreaseWeight}>+</button>
                </div>

                <p className='mb'>kg</p>

                <input
                    className='slider mb3'
                    type="range"
                    min="0"
                    max="200"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                />

                <div className='reportWrapper'>
                        <button onClick={saveWeight} className='add-btn'>Save</button>
                </div>
            </div>




            

            
        </div>
    </>
  )
}

export default WeightLog
