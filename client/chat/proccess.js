// import "./process.scss";
import { useSelector } from "react-redux";
import { useTypedSelector } from '../components/hooks/useTypedSelector';
function Process() {
  // returns new state from the reducers
  const {encrypt,cypher,text} = useTypedSelector(state => state.processReducer)

  return (
    <div className="process">
      <h5>
        Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
      </h5>
      <div className="incoming">
        <h4>Incoming Data</h4>
        <p>{cypher}</p>
      </div>
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}
export default Process;