CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  project TEXT NOT NULL CHECK (char_length(project) BETWEEN 1 AND 80),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 1500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a lead (public contact form)
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read/update/delete: site owner uses admin tools.