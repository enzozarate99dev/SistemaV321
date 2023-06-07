const NoAccess = (props: noAcceseProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h2 className="text-center">{props.text}</h2>
    </div>
  );
};

export default NoAccess;
interface noAcceseProps {
  text: string;
}
