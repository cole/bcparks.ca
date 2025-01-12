import React from "react"
import MegaMenu from "./megaMenu.js"
import BetaBanner from "../components/betaBanner"


export default function Header({ content = [] }) {

  return (
    <>
      <BetaBanner></BetaBanner>
      <MegaMenu content={content} menuMode="responsive" />
    </>
  )  
}