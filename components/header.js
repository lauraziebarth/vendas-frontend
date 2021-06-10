export default function Header({ children, title }) {
  return (
    <div>
      <div className="main-title">
        <h1>{title}</h1>
      </div>

      {children}

      <style jsx>
        {`
          .main-title {
            display: flex;
            flex-direction: column;
            align-content: top;
            margin-left: 50px;
            border-bottom: 2px solid #f2f2f2;
          }
        `}
      </style>
    </div>
  );
}
