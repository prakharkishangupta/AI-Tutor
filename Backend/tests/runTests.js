import { execSync } from 'child_process';

console.log('Running all tests with coverage...');

try {
    execSync('npm run test:coverage', { stdio: 'inherit' });
    console.log('\nTests completed successfully!');
    console.log('\nCoverage report is available in the coverage directory');
    console.log('Open coverage/index.html in your browser to view the detailed report');
} catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
}