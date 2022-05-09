import React from "react";

import "./MainContent.css";

import Drawer, {
  DrawerContainer,
  MainContentContainer,
} from "../../src/Drawer";

const App = () => (
  <Drawer position="bottom" size={30}>
    {({
      position,
      size,
      swiping,
      translation,
      mainContentScroll,
      toggleDrawer,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    }) => (
      <div>
        <DrawerContainer
          position={position}
          size={size}
          swiping={swiping}
          translation={translation}
          toggleDrawer={toggleDrawer}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          drawerContent={
            <div
              style={{
                height: "100%",
                background: "white",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "25%",
                    background: "grey",
                    height: "5px",
                    margin: "12px",
                    borderRadius: "20px",
                  }}
                />
                <h2>Welcome to React</h2>
              </div>
            </div>
          }
        />
        <MainContentContainer
          translation={translation}
          mainContentScroll={mainContentScroll}
        >
          <div>
            <h1>React Swipeable Drawer</h1>
          </div>
        </MainContentContainer>
      </div>
    )}
  </Drawer>
);

export default App;
