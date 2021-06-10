export default function Button({ title, onClick, disabled }) {
  return (
    <div className="box-button">
      <button type="button" disabled={disabled} onClick={onClick}>
        {title}
      </button>

      <style jsx>
        {`
          .box-button {
            display: flex;
            align-content: top;
            margin-top: 30px;
            margin-left: 50px;
          }
          button {
            padding: 10px;
            border: 1px solid #f2f2f2;
            border-radius: 10px;
            width: auto;
            background-color: #4b2f7e;
            color: #ffffff;
            justify-content: flex-end;
            font-weight: bolder;
          }
          button:disabled,
          button[disabled] {
            border: 1px solid #999999;
            background-color: #cccccc;
            color: #666666;
          }
        `}
      </style>
    </div>
  );
}
