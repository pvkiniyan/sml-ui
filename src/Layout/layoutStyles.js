import css from 'styled-jsx/css';

export default css`
.layoutCont {
  width: 100%;
  height: 100%;
  display: flex;
}
.sidebarCont {
  max-width: 75px;
  width: 100%; 
  height: 100%;
  background-color: #fff;
  box-shadow: 0.75px 0.75px 3px -0.75px #ccc;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 0px;
  overflow: auto;
}
.logoCont {
  height: 60px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.mainCont {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  background-color: #F5F6F8;
}
.headerCont {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  
}
.contentCont {
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #F5F6F8;
}
.userInfoContainer {
  background: white;
  box-shadow: 1px 1px 15px 1px #ccc;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.elCont {
	height: 30px;
	background-color: #F5F5F5;
	display: flex;
	justify-content: space-between;
	padding: 0px 10px;
	align-items: center;
}
`
