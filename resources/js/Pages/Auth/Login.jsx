import Checkbox from '@/js/Components/Checkbox';
import InputError from '@/js/Components/InputError';
import InputLabel from '@/js/Components/InputLabel';
import PrimaryButton from '@/js/Components/PrimaryButton';
import TextInput from '@/js/Components/TextInput';
import GuestLayout from '@/js/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                    <h2 className="text-center mb-4">Sign in to your account</h2>
                    {status && (
                        <div className="alert alert-success" role="alert">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <InputLabel htmlFor="email" value="Email" className="form-label" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="text-danger mt-1" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="password" value="Password" className="form-label" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-control"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="text-danger mt-1" />
                        </div>

                        <div className="mb-3 form-check d-flex justify-content-between">
                            <label className="form-check-label">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2">Remember me</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-decoration-none"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <div className="d-grid">
                            <PrimaryButton className="btn btn-primary" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
