export default function Table({ list }) {
  return (
    <div className="table">
      {list.map((item) => (
        <div className="table-item">
          <h1>{item.nome}</h1>
        </div>
      ))}

      <style jsx>
        {`
          .table {
            display: flex;
            align-content: top;
            flex-direction: column;
            margin-top: 30px;
            margin-left: 50px;
          }
          .table-item {
            padding: 20px 10px;
            border-bottom: 2px solid #f2f2f2;
            font-weight: bolder;
            flex-direction: row;
            display: flex;
            justify-content: space-between;
          }
          .table-item:hover {
            background-color: #f2f2f2;
            color: #4b2f7e;
          }
          h1 {
            font-weight: 600;
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
}
