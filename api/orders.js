// api/orders.js
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-api-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ordername, orderwork, ordertime, ordermenu, orderoption, ordercount } = req.body;

    // Supabase에 주문 정보 저장
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          ordername,
          orderwork,
          ordertime,
          ordermenu,
          orderoption,
          ordercount,
        },
      ]);

    if (error) {
      res.status(500).json({ message: '주문 저장에 실패했습니다.', error });
    } else {
      res.status(200).json({ message: '주문이 저장되었습니다.', data });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
