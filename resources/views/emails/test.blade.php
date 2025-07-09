@component('mail::message')
# Test Email

Hello {{ $data['name'] }}, this is a test email from **EdenicFlora**.

- Email: {{ $data['email'] }}
- Sent at: {{ now()->toDayDateTimeString() }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
