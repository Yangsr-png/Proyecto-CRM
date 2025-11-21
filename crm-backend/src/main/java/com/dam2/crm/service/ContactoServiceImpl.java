package com.dam2.crm.service;

import com.dam2.crm.model.Contacto;
import com.dam2.crm.repository.ContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactoServiceImpl implements ContactoService {

    @Autowired
    private ContactoRepository contactoRepository;

    @Override
    public List<Contacto> findAll() {
        return contactoRepository.findAll();
    }

    @Override
    public List<Contacto> findByCliente(Long clienteId) {
        return contactoRepository.findByClienteId(clienteId);
    }

    @Override
    public Optional<Contacto> findById(Long id) {
        return contactoRepository.findById(id);
    }

    @Override
    public Contacto save(Contacto contacto) {
        return contactoRepository.save(contacto);
    }

    @Override
    public void deleteById(Long id) {
        contactoRepository.deleteById(id);
    }
}