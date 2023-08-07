"use client";

import {useGetRecordsQuery, useLazyGetRecordsQuery} from "../api";


type Props = {
    getItems: (offset: number, limit: number) => void
  };

export default function InfiniteList({}: Props) {
    const act = useGetRecordsQuery()
    
    

    return <>

    </>
  }
