export default function VerifyDeploy() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
            <h1>DEPLOYMENT VERIFIED</h1>
            <p>Timestamp: {new Date().toISOString()}</p>
            <p>Commit: fix(debug)</p>
            <p>Substrate: Active</p>
        </div>
    );
}
