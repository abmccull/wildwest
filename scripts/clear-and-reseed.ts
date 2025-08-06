import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

async function clearAndReseed() {
  console.log('🗑️  Clearing existing pages from database...');
  
  const { error: deleteError } = await supabase
    .from('pages')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (deleteError) {
    console.error('❌ Error clearing pages:', deleteError);
    process.exit(1);
  }
  
  console.log('✅ Successfully cleared pages from database');
  console.log('Now run: npm run seed');
}

clearAndReseed();