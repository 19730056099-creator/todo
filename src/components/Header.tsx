export default function Header() {
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            color: '#1a1a1a',
            letterSpacing: 1,
          }}
        >
          MengZhouyi的待办清单
        </h1>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 13,
            color: '#999',
            letterSpacing: 2,
            fontWeight: 400,
          }}
        >
          TODO LIST &middot; 高效管理每一天
        </p>
      </div>
      <hr
        style={{
          border: 'none',
          borderTop: '2px solid #2d2d2d',
          margin: 0,
          opacity: 0.85,
        }}
      />
    </div>
  );
}
