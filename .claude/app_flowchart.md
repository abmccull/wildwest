flowchart TD
A[Landing Page] **-->** B{User Action}
B **-->**|Select Service| C[Service Page]
B **-->**|Use Chatbot| D[AI Chatbot]
B **-->**|Click WhatsApp| E[WhatsApp Deep Link]
B **-->**|Schedule| F[Calendar Widget]
C **-->** G[Lead Capture Form]
D **-->** H[Chatbot Lead Form]
E **-->** I[WhatsApp Lead Capture]
G **-->** J{Consent Obtained}
H **-->** J
I **-->** J
J **-->**|Yes| K[Submit Lead]
J **-->**|No| L[Abort]
K **-->** M[Database Supabase]
M **-->** N[Custom CRM]
M **-->** O[Slack Alert]
M **-->** P[Email and SMS via Resend]
F **-->** Q[Booking Submission]
Q **-->** K
