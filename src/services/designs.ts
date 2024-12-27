import { supabase } from './supabase';
import { Design } from '../types/design';

export const saveDesign = async (design: Omit<Design, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('designs')
    .insert(design)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateDesign = async (id: string, design: Partial<Design>) => {
  const { data, error } = await supabase
    .from('designs')
    .update({ ...design, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const loadDesigns = async () => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const deleteDesign = async (id: string) => {
  const { error } = await supabase
    .from('designs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};