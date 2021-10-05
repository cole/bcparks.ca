import React, { useState, useEffect, useRef } from "react"
import {
  Grid,
  Button,
  Box,
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import ParkAccessStatus from "./parkAccessStatus"
import Advisory from "./advisory"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import { navigate } from "gatsby"

export default function ParkHeader({ data }) {
  const { advisories, parkAccessStatus, park, menu } = data

  const menuItems = useRef([...menu])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    menuItems.current[currentIndex].visible = false
    return
  }, [currentIndex])

  const handleMenuClick = () => {
    setOpenMenu(!openMenu)
  }

  const handleMenuChange = index => {
    const items = menuItems.current
    items[currentIndex].visible = true
    items[index].visible = false
    menuItems.current = [...items]
    setCurrentIndex(index)
    handleMenuClick()
    navigate(`#${menuItems.current[index].url}`)
  }

  return (
    <Paper elevation={0} id="park-header-container">
      <div className="col-12 no-padding">
        <Grid item xs={12}>
          <Box mt={0}>
            <h1 className="park-heading">{park.protectedAreaName}</h1>
          </Box>
        </Grid>
        <div className="d-none d-xl-block d-lg-block d-md-none d-sm-none d-xs-none">
          <div className="flex-display p10t">
            <Grid item xs={12} sm={12} md={12} lg={7}>
              {park.isDayUsePass === "true" && (
                <>
                  <Button
                    className="yellow-button"
                    href="https://discovercamping.ca/"
                  >
                    Book a campsite
                  </Button>
                  <Button className="blue-button ml10" href="#">
                    Get a daypass
                  </Button>
                </>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              className="park-info-header-flex"
            >
              <div className="park-info-header park-access">
                <ParkAccessStatus data={parkAccessStatus.accessStatus} />
              </div>
              <div className="park-info-header ml-auto park-access">
                <Advisory data={advisories} />
              </div>
            </Grid>
          </div>
        </div>
        <div className="d-block d-sm-block d-xs-block d-md-block d-lg-none d-xl-none">
          <Grid item xs={12} sm={12} md={12} className="park-info-header-flex">
            <div className="park-info-header">
              <ParkAccessStatus data={parkAccessStatus.accessStatus} />
            </div>
            <div className="park-info-header">
              <Advisory data={advisories} />
            </div>
          </Grid>
          {park.isDayUsePass === "true" && (
            <Grid item xs={12}>
              <div className="p20t">
                <Button
                  className="yellow-button full-width"
                  href="https://discovercamping.ca/"
                >
                  Book a campsite
                </Button>
              </div>
              <div className="p10t">
                <Button className="blue-button full-width" href="#">
                  Get a daypass
                </Button>
              </div>
            </Grid>
          )}
          {park.isDayUsePass !== "true" && <div className="p10t"></div>}
          {/* Mobile */}
          <Grid item xs={12} className="park-menu-mobile">
            <List
              component="nav"
              aria-labelledby="park-menu-mobile"
              disablePadding
            >
              <ListItem button onClick={handleMenuClick}>
                <ListItemText>
                  {menuItems.current[currentIndex].text}
                </ListItemText>
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMenu} timeout="auto" unmountOnExit>
                {menuItems.current.map((item, index) => (
                  <div key={index}>
                    {item.visible && (
                      <List component="div" disablePadding>
                        <ListItem
                          button
                          onClick={() => {
                            handleMenuChange(index)
                          }}
                        >
                          <ListItemText primary={item.text} />
                        </ListItem>
                      </List>
                    )}
                  </div>
                ))}
              </Collapse>
            </List>
          </Grid>
        </div>
      </div>
    </Paper>
  )
}
