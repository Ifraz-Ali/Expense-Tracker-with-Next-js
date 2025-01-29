'use client';
import { createContext, ReactNode, useContext, useState } from "react";

type trackerContextType = {
    allData: allDataType[] | [],
    trackData: (allData: allDataType[]) => void,
}
type allDataType = {
    type: string,
    category: string,
    amount: number,
    date: string,
}
const trackerContext = createContext<trackerContextType | null>(null);

export default function TrackerContextProvider({ children }: { children: ReactNode }) {
    const [allData, setAllData] = useState<allDataType[]>([]);
    const trackData = (data: allDataType[]) => {
        setAllData(data);
    }
    return (
        <trackerContext.Provider value={{ allData, trackData }}>
            {children}
        </trackerContext.Provider>
    );
}

export const UsetrackerContext = () => useContext(trackerContext);